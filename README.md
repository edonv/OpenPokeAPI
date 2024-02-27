# OpenPokéAPI

![Static Badge](https://img.shields.io/badge/OpenAPI-v3.1-%236BA539?logo=openapiinitiative)
![Static Badge](https://img.shields.io/badge/Pok%C3%A9API-v2-%23ef5350?logo=pokemon&link=https%3A%2F%2Fpokeapi.co%2Fdocs%2Fv2)
![GitHub License](https://img.shields.io/github/license/PokeAPI/pokeapi)

`OpenPokéAPI` is an OpenAPI 3.1 spec for [PokéAPI](https://pokeapi.co/) ([GitHub](https://github.com/PokeAPI)).

## Repo Contents

In the `openapi` folder, is the spec broken down into separate files for easier consumption. In the `dist` folder is the spec "bundled" together into a single file for uses that can't handle an OpenAPI description spread across multiple file. The bundled file is generated using the [Redocly CLI](https://redocly.com/docs/cli/)'s `bundle` command.

## To-Do's

- [ ] Finish fixing the GitHub Action that runs the Redocly CLI `bundle` command.
- [ ] Figure out how to standardize custom OpenAPI fields for specifying the endpoint each `NamedAPIResource`/`NamedAPIResourceList` would point to.
