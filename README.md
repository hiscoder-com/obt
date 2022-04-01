<div id="top"></div>
<!--
*** Thanks for checking out the Best-README-Template. If you have a suggestion
*** that would make this better, please fork the repo and create a pull request
*** or simply open an issue with the tag "enhancement".
*** Don't forget to give the project a star!
*** Thanks again! Now go create something AMAZING! :D
-->



<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->
[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]



<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/github_username/repo_name">
    <img src="images/logo.png" alt="Logo" width="80" height="80">
  </a>

<h3 align="center">OPEN BIBLE TEXT</h3>

  <p align="center">
    project_description
    <br />
    <br />
    <a href="https://develop--tt-bsa.netlify.app/">View Demo</a>
    ·
    <a href="https://github.com/github_username/repo_name/issues">Report Bug</a>
    ·
    <a href="https://github.com/github_username/repo_name/issues">Request Feature</a>
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

<!-- [![Product Name Screen Shot][product-screenshot]](https://example.com) -->


**Purpose**
- The purpose of this project

**Problem**
- The problem statement

**Scope**
- What's in scope and out of scope for this project?

**Background**
- What led us to this point? How did we get here?

Here's a blank template to get started: To avoid retyping too much info. Do a search and replace with your text editor for the following: `github_username`, `repo_name`, `twitter_handle`, `linkedin_username`, `email`, `email_client`, `project_title`, `project_description`

<p align="right">(<a href="#top">back to top</a>)</p>



### Built With

* [Next.js](https://nextjs.org/)
* [React.js](https://reactjs.org/)
* [Vue.js](https://vuejs.org/)
* [Angular](https://angular.io/)
* [Svelte](https://svelte.dev/)
* [Laravel](https://laravel.com)
* [Bootstrap](https://getbootstrap.com)
* [JQuery](https://jquery.com)

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started

This is an example of how you may give instructions on setting up your project locally.
To get a local copy up and running follow these simple example steps.

### Prerequisites

**Data**
what is the source of the data and data formats are covered by this project?


This is an example of how to list things you need to use the software and how to install them.
* npm
  ```sh
  npm install npm@latest -g
  ```

### Installation/First Steps

1. Get a free API Key at [https://example.com](https://example.com)
2. Clone the repo
   ```sh
   git clone https://github.com/github_username/repo_name.git
   ```
3. Install NPM packages
   ```sh
   npm install
   ```
4. Enter your API in `config.js`
   ```js
   const API_KEY = 'ENTER YOUR API';
   ```

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- USAGE EXAMPLES -->
## Usage/Integration

## 0.10.0 (old)

Интерфейс приложения состоит из нескольких частей: AppBar (верхняя панель приложения) и Workspace (все остальное рабочее пространство).

AppBar отображает ссылку на то, что открыто сейчас в Workspace.
Здесь можно менять книгу и главу.

<p align="center"><img src="https://user-images.githubusercontent.com/74174349/125074047-73bedf00-e0c5-11eb-8134-8232abb2ea94.png">	</p>

В "гамбургер" (☰) добавлено меню с несколькими функциями:
<p align="center"><img src="https://user-images.githubusercontent.com/74174349/125184340-7fc1b280-e225-11eb-827e-c5d22fe8c03c.png">	</p>

 - смена языка интерфейса;
 - добавление карточек с ресурсами;
 - выбор размера шрифта в карточках;
 - комментарий о том как отправить уведомление об опечатке;
 - два шаблона с карточками.

В Workspace пользователь может управлять своим рабочим пространством, пользуясь карточками: добавлять, менять размер, перемещать, удалять. Можно загружать уже готовые шаблоны.


Перечень ресурсов (Библия, TN (Заметки), TQ (Вопросы), OBS (Открытые Библейские Истории), OBS-TN, OBS-TQ), которые поддерживает приложение, находятся в пункте меню "Добавить материал".

![GIF 11 07 2021 9-19-23](https://user-images.githubusercontent.com/74174349/125184793-5dca2f00-e229-11eb-9aca-86720366ce95.gif)

<!-- ![Workspace3](https://user-images.githubusercontent.com/74174349/125075733-af5aa880-e0c7-11eb-8903-ae0db24a075a.png) -->

Так как Заметки и Вопросы указываются не в общем для главы, а для конкретного стиха - в приложении это работает через клик.
После клика по стиху в карточках с Заметками или Вопросами подгружаются нужные данные. Это работает как для Библии, так и для OBS.

Клик правой кнопкой мыши по стиху вызывает контекстное меню, где пользователь может отправить уведомление об опечатке.

![Workspace4](https://user-images.githubusercontent.com/74174349/125075754-b386c600-e0c7-11eb-97ec-e946d25833bc.png)

Для отправки такого уведомления пользователю необходимо написать свой комментарий.

![SendError](https://user-images.githubusercontent.com/74174349/125076698-e67d8980-e0c8-11eb-857b-f4d0f475d657.png)

После отправки ресурс, книга, глава и номер стиха вместе с текстом стиха и комментарием пользователя попадают в репозиторий.


_For more examples, please refer to the [Documentation](https://example.com)_  Possibly JS Docs. 

[Styleguidist link](https://example.netlify.app) 

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- ROADMAP -->
## Roadmap

- [] Feature 1
- [] Feature 2
- [] Feature 3
    - [] Nested Feature

See the [open issues](https://github.com/github_username/repo_name/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.  [Guidelines for external contributions.](https://forum.door43.org)

You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

If you would like to fork the repo and create a pull request. 

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE` for more information.

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- CONTACT -->
## Contact

Your Name - [@twitter_handle](https://twitter.com/twitter_handle) - email@email_client.com

Project Link: [https://github.com/github_username/repo_name](https://github.com/github_username/repo_name)

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- ACKNOWLEDGMENTS -->
## Acknowledgments

* []()
* []()
* []()

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/github_username/repo_name.svg?style=for-the-badge
[contributors-url]: https://github.com/github_username/repo_name/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/github_username/repo_name.svg?style=for-the-badge
[forks-url]: https://github.com/github_username/repo_name/network/members
[stars-shield]: https://img.shields.io/github/stars/github_username/repo_name.svg?style=for-the-badge
[stars-url]: https://github.com/github_username/repo_name/stargazers
[issues-shield]: https://img.shields.io/github/issues/github_username/repo_name.svg?style=for-the-badge
[issues-url]: https://github.com/github_username/repo_name/issues
[license-shield]: https://img.shields.io/github/license/github_username/repo_name.svg?style=for-the-badge
[license-url]: https://github.com/github_username/repo_name/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/linkedin_username
[product-screenshot]: images/screenshot.png
