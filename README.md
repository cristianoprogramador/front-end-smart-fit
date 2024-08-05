# Front-end Smart Fit

> Projeto desenvolvido para o desafio técnico de Front-end.

## Preview

![image](https://github.com/user-attachments/assets/3733accb-d4e1-4228-bf4f-6327a61aeb8f)
![image](https://github.com/user-attachments/assets/ea113750-8351-4b3a-8660-8e174079f431)


## Sobre o Projeto

Este projeto foi desenvolvido como parte de um desafio técnico para a posição de Front-end Developer. A proposta era criar uma página para buscar unidades da Smart Fit que estão **fechadas** ou **abertas** para consulta e reserva, seguindo um layout e regras de negócio específicas.

## Funcionalidades Implementadas

- **Carregamento de Unidades**: As unidades são carregadas a partir de um arquivo JSON através de uma requisição `GET` para a URL `https://test-frontend-developer.s3.amazonaws.com/data/locations.json`.
- **Busca de Unidades**: Permite a busca de todas as unidades disponíveis.
- **Filtros de Busca**:
  - Filtrar unidades abertas ou fechadas.
  - Filtrar unidades por período de funcionamento (Manhã, Tarde, Noite).
- **Exibição de Resultados**: Mostra a quantidade de resultados encontrados e exibe as unidades conforme os filtros aplicados.
- **Feedback ao Usuário**: Mostra uma mensagem "Nenhuma unidade encontrada" quando não há resultados para os filtros aplicados.
- **Ícones de Status**: Valida e exibe os ícones corretos de acordo com o status da unidade (máscara, toalha, bebedouro, vestiários).

## Componentes do Projeto

- **Formulário de Busca com Filtros**: Inclui campos para seleção do período e checkbox para exibir unidades fechadas.
- **Legenda**: Explicação dos ícones de status exibidos.
- **Lista de Unidades**: Exibe as unidades filtradas com informações detalhadas e status.

## Tecnologias Utilizadas

- **React**: Biblioteca JavaScript para construção de interfaces de usuário.
- **Next.js**: Framework React para desenvolvimento de aplicações web com renderização do lado do servidor.
- **TypeScript**: Superconjunto de JavaScript que adiciona tipagem estática ao idioma.
- **Tailwind CSS**: Framework de CSS utilitário para estilização rápida e eficiente.

## Como Executar o Projeto

1. Clone o repositório:
    ```bash
    git clone https://github.com/cristianoprogramador/front-end-smart-fit.git
    ```

2. Instale as dependências:
    ```bash
    cd front-end-smart-fit
    npm install
    ```

3. Execute o projeto:
    ```bash
    npm run dev
    ```

4. Abra o navegador e acesse:
    ```
    http://localhost:3000
    ```

## Estrutura do Projeto

- `pages/`: Contém as páginas do Next.js.
  - `index.tsx`: Página principal que implementa a busca e exibição das unidades.
- `components/`: Componentes reutilizáveis.
- `public/`: Arquivos públicos, incluindo imagens e ícones.

## Melhorias Futuras

- **Testes Unitários**: Implementação de testes unitários para garantir a qualidade do código.
- **Deploy**: Publicação do app em plataformas como Vercel ou Heroku para fácil acesso e demonstração.

## Contato

- GitHub: [cristianoprogramador](https://github.com/cristianoprogramador)
- Email: [seuemail@dominio.com](mailto:seuemail@dominio.com)
