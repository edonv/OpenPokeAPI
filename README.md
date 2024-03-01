# OpenPokéAPI

![Static Badge](https://img.shields.io/badge/OpenAPI-v3.1-%236BA539?logo=openapiinitiative)
![Static Badge](https://img.shields.io/badge/Pok%C3%A9API-v2-%23ef5350?logo=pokemon&link=https%3A%2F%2Fpokeapi.co%2Fdocs%2Fv2)
![GitHub License](https://img.shields.io/github/license/PokeAPI/pokeapi)

`OpenPokéAPI` is an OpenAPI 3.1 spec for [PokéAPI](https://pokeapi.co/) ([GitHub](https://github.com/PokeAPI)).

## Repo Contents

In the `openapi` folder, is the spec broken down into separate files for easier consumption. In the `dist` folder is the spec "bundled" together into a single file for uses that can't handle an OpenAPI description spread across multiple file. The bundled file is generated using the [Redocly CLI](https://redocly.com/docs/cli/)'s `bundle` command.

## To-Do's

- [ ] Add `required` to every `object` type in the spec 😭
- [ ] Finish fixing the GitHub Action that runs the Redocly CLI `bundle` command.
    - [ ] Maybe in same or different plugin, make code that automatically adds `required` field?
    - [ ] Once plugin below is finished, make sure this action uses it.
    - [ ] Add plain `split` command to Action as well, and have `bundle` command place bundled file in `/bundled` folder, and the `split` command place files in `/split` folder. That way people can use both single-file and multi-file versions with the custom `x-` properties already expanded.
- [ ] Figure out how to standardize custom OpenAPI fields for specifying the endpoint each `NamedAPIResource`/`NamedAPIResourceList` would point to.
    - This would normally would use `links` field on `path` objects.
    - [ ] Make a custom plugin for Redocly that looks at a custom `x-___` property on `APIReference`/`NamedAPIReference` properties to automatically expands to `links` fields on the operations.
