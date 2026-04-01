# UI-components

UI-components -  библиотека компонентов пользовательского интерфейса React для рабочего пространства Workdeskbio 4.0 Bioclaude.

Предоставляет коллекцию готовых компонентов, переиспользуемых во всех пространствах Воркдеска.

## Installation

Инструкция по добавлению библиотеки workdeskbio/ui-components в react проект:
 
1. в проекте в package.json в devDependencies добавляем следующую строку - "@workdeskbio/ui-components": "1.1.1" , где номер версии соответствует номеру тэга в репозитории - https://gitlab.bioclaude.ru/bioclaude/dis/dotnet/libraries/workdeskbio/ui-components/-/tags
 
2. Создаем токен доступа к библиотеке в gitlab
https://gitlab.bioclaude.ru/-/profile/personal_access_tokens
Select scopes
выбрать "api", "read_api ", "read_registry"
Скопировать получившийся токен
 
3. в директории проекта в терминале запускаем:
npm config set -- //gitlab.bioclaude.ru/api/v4/groups/2418/-/packages/npm/:_authToken=${COMMON_REGISTRY_TOKEN}
где ${COMMON_REGISTRY_TOKEN} нужно заменить на свой скопированный токен доступа из GitLab
после запустить еще одну команду:
npm config set @workdeskbio:registry=https://gitlab.bioclaude.ru/api/v4/groups/2418/-/packages/npm/
 
4. npm i @workdeskbio/ui-components

## Setting up Global Styles

Для подключения Глобальных стилей в файле index.css пропишите:

import '@workdeskbio/ui-components/src/global/styles/index.css'

## Quick start

После установки вы можете импортировать любой компонент пользовательского интерфейса ui-components и использовать его, меняя стили и функциональность с помощью пропсов компонента. Для использования других сущностей как enum, interface и тд. достаточно импортировать их из библиотеки. Для использования некоторых функций-helpers необходимо будет передача функциям аргументов.

## Technology stack

React/Typescript 

## Статья в Confluence с полным списком экспортируемых компонентов и сущностей

https://confluence.bioclaude.ru/display/NET/%5B.NET%5D%3A+Workdeskbio4.0-ui-components
