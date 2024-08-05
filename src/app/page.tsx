"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

interface Schedule {
  weekdays: string;
  hour: string;
}

interface Location {
  id: number;
  title: string;
  content: string;
  opened?: boolean;
  mask: string;
  towel: string;
  fountain: string;
  locker_room: string;
  schedules: Schedule[];
  street?: string;
  region?: string;
  city_name?: string;
  state_name?: string;
  uf?: string;
}

const periods = [
  { label: "Manhã", value: "manha", time: "06:00 às 12:00" },
  { label: "Tarde", value: "tarde", time: "12:01 às 18:00" },
  { label: "Noite", value: "noite", time: "18:01 às 23:00" },
];

const safetyMeasures = [
  {
    title: "Máscara",
    items: [
      { src: "required-mask", label: "Obrigatório" },
      { src: "recommended-mask", label: "Recomendado" },
    ],
  },
  {
    title: "Toalha",
    items: [
      { src: "required-towel", label: "Obrigatório" },
      { src: "recommended-towel", label: "Recomendado" },
    ],
  },
  {
    title: "Bebedouro",
    items: [
      { src: "partial-fountain", label: "Parcial" },
      { src: "forbidden-fountain", label: "Proibido" },
    ],
  },
  {
    title: "Vestiários",
    items: [
      { src: "required-lockerroom", label: "Liberado" },
      { src: "partial-lockerroom", label: "Parcial" },
      { src: "forbidden-lockerroom", label: "Fechado" },
    ],
  },
];

const getImageSrc = (type: string, value: string) => {
  const map: { [key: string]: { [key: string]: string } } = {
    mask: {
      required: "required-mask",
      recommended: "recommended-mask",
    },
    towel: {
      required: "required-towel",
      recommended: "recommended-towel",
    },
    fountain: {
      partial: "partial-fountain",
      not_allowed: "forbidden-fountain",
    },
    locker_room: {
      allowed: "required-lockerroom",
      partial: "partial-lockerroom",
      closed: "forbidden-lockerroom",
    },
  };

  return map[type][value] || "";
};

export default function Home() {
  const [locations, setLocations] = useState<Location[]>([]);
  const [visibleLocations, setVisibleLocations] = useState<Location[]>([]);
  const [selectedPeriod, setSelectedPeriod] = useState<string | null>(null);
  const [showClosedUnits, setShowClosedUnits] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await fetch(
          "https://test-frontend-developer.s3.amazonaws.com/data/locations.json"
        );
        const data = await response.json();
        const filteredLocations = data.locations.filter(
          (location: { opened: any }) => location.opened
        );
        setLocations(data.locations);
        setVisibleLocations(filteredLocations);
      } catch (error) {
        console.error("Failed to fetch locations:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLocations();
  }, []);

  const isLocationOpenInPeriod = (location: Location, period: string) => {
    const { time } = periods.find((p) => p.value === period) || { time: "" };
    const [periodStart, periodEnd] = time
      .split(" às ")
      .map((t) => parseInt(t.replace(":", "")));

    return location.schedules?.some((schedule) => {
      if (schedule.hour.toLowerCase() === "fechada") return false;
      const [scheduleStart, scheduleEnd] = schedule.hour
        .split(" às ")
        .map((t) => parseInt(t.replace("h", "").replace(":", "")));

      const correctStart = scheduleStart * 100;
      const correctEnd = scheduleEnd * 100;

      return (
        (correctStart >= periodStart && correctStart < periodEnd) ||
        (correctEnd > periodStart && correctEnd <= periodEnd) ||
        (correctStart <= periodStart && correctEnd >= periodEnd)
      );
    });
  };

  const applyFilter = () => {
    let filteredLocations = locations;

    if (selectedPeriod) {
      filteredLocations = filteredLocations.filter((location) =>
        isLocationOpenInPeriod(location, selectedPeriod)
      );
    }

    if (!showClosedUnits) {
      filteredLocations = filteredLocations.filter(
        (location) => location.opened
      );
    }

    setVisibleLocations(filteredLocations);
  };

  const handlePeriodChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedPeriod(event.target.value);
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setShowClosedUnits(event.target.checked);
  };

  const handleClearFilter = () => {
    console.log("Cade");
    setSelectedPeriod(null);
    setShowClosedUnits(false);
    setVisibleLocations(locations);
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <div className="bg-black h-24 w-full flex justify-center items-center">
        <Image src="/logo.svg" alt="logo" width={150} height={80} />
      </div>

      <div className="md:w-[80%] w-[95%] max-w-[1050px] mt-20">
        <div className="text-4xl font-semibold">
          <div>REABERTURA</div>
          <div>SMART FIT</div>
          <div className="w-20 h-2 mt-4 bg-black" />
        </div>

        <div className="mt-8">
          O horário de funcionamento das nossas unidades está seguindo os
          decretos de cada município. Por isso, confira aqui se a sua unidade
          está aberta e as medidas de segurança que estamos seguindo.
        </div>

        <div className="rounded-lg p-4 border-[3px] border-gray-200 mt-10 text-gray-500">
          <div className="flex flex-row gap-2 items-center">
            <Image src="/icon-hour.png" alt="logo" width={30} height={80} />
            <div>Horário</div>
          </div>

          <div className="mt-8 text-2xl font-light">
            <div className="ml-2">Qual período quer treinar?</div>

            <div className="w-full h-[2px] bg-gray-200 my-3" />

            <div className="flex flex-col text-lg mt-5">
              {periods.map(({ label, value, time }, index) => (
                <div key={value}>
                  <div className="flex flex-row justify-between">
                    <label className="custom-radio flex items-center">
                      <input
                        type="radio"
                        name="periodo"
                        value={value}
                        checked={selectedPeriod === value}
                        onChange={handlePeriodChange}
                      />
                      <span>{label}</span>
                    </label>
                    <div className="mr-3">{time}</div>
                  </div>
                  <div className="w-full h-[2px] bg-gray-200 my-3" />
                </div>
              ))}
            </div>
          </div>

          <div className="text-black flex flex-col md:flex-row items-center gap-4 md:gap-0 justify-between mt-7">
            <label className="custom-checkbox flex items-center">
              <input
                type="checkbox"
                name="show-close-units"
                onChange={handleCheckboxChange}
                checked={showClosedUnits}
              />
              <span>Exibir unidades fechadas</span>
            </label>
            <div className="flex flex-row gap-1 items-center">
              <div>Resultados encontrados:</div>
              <div className="font-semibold text-lg">
                {visibleLocations.length}
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-4 justify-center items-center mt-7 mb-2">
            <button
              className="w-64 h-16 md:h-12 bg-[#FFB612] hover:opacity-80 text-black flex flex-col md:flex-row justify-center items-center text-center font-semibold rounded gap-1"
              onClick={applyFilter}
            >
              <div>ENCONTRAR</div> <div>UNIDADE</div>
            </button>
            <button
              className="w-64 h-12 border hover:bg-gray-50 text-black flex justify-center items-center text-center font-semibold rounded"
              onClick={handleClearFilter}
            >
              LIMPAR
            </button>
          </div>
        </div>

        <div className="bg-gray-100 p-3 mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
          {safetyMeasures.map(({ title, items }) => (
            <div
              key={title}
              className="flex flex-col gap-3 justify-center items-center"
            >
              <div className="font-extrabold">{title}</div>
              <div className="flex flex-row justify-center items-center gap-2">
                {items.map(({ src, label }) => (
                  <div
                    key={src}
                    className="flex flex-col justify-center items-center"
                  >
                    <Image
                      src={`/${src}.png`}
                      alt={label}
                      width={50}
                      height={80}
                    />
                    {label}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-10 mb-20">
          {visibleLocations.map((location, index) => {
            const isOpen = location.opened === true ? "Aberto" : "Fechado";
            return (
              <div
                className="bg-gray-100 p-3 flex flex-col justify-start custom-shadow rounded"
                key={index}
              >
                <div
                  className={`font-semibold ${
                    isOpen === "Aberto" ? "text-[#2FC022]" : "text-[#dc0a17]"
                  }`}
                >
                  {isOpen}
                </div>
                <div className="text-2xl font-semibold">{location.title}</div>
                <div
                  className="mt-2 text-gray-500"
                  dangerouslySetInnerHTML={{ __html: location.content }}
                />
                {"opened" in location ? (
                  <>
                    <div className="w-full h-[2px] bg-gray-200 my-3" />
                    <div className="flex flex-row gap-2 justify-around items-center">
                      <Image
                        src={`/${getImageSrc("mask", location.mask)}.png`}
                        alt="Mask status"
                        width={50}
                        height={80}
                      />
                      <Image
                        src={`/${getImageSrc("towel", location.towel)}.png`}
                        alt="Towel status"
                        width={50}
                        height={80}
                      />
                      <Image
                        src={`/${getImageSrc(
                          "fountain",
                          location.fountain
                        )}.png`}
                        alt="Fountain status"
                        width={50}
                        height={80}
                      />
                      <Image
                        src={`/${getImageSrc(
                          "locker_room",
                          location.locker_room
                        )}.png`}
                        alt="Locker room status"
                        width={50}
                        height={80}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3 mt-4">
                      {location.schedules?.map((schedule, index) => {
                        return (
                          <div key={index} className="flex flex-col gap-1">
                            <div className="font-semibold text-xl">
                              {schedule.weekdays}
                            </div>
                            <div className="text-sm">{schedule.hour}</div>
                          </div>
                        );
                      })}
                    </div>
                  </>
                ) : (
                  <div className="mt-2 text-gray-500">
                    {location.street} {location.region} {location.city_name}{" "}
                    {location.state_name} {location.uf}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="bg-[#333333] h-52 w-full flex flex-col gap-4 justify-center items-center">
        <div>
          <Image src="/logo.svg" alt="logo" width={100} height={80} />
        </div>
        <div className="text-white mb-10">
          Todos os direitos reservados - {new Date().getFullYear()}
        </div>
      </div>
    </main>
  );
}
