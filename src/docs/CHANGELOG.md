# Changelog

All notable changes to this project will be documented in this file.

OpenBibleText is part of the [open components ecosystem](https://opencomponents.io)

## [1.11.0] - 2023-05-30

### Added

- highlight TN quotes

## [1.10.7] - 2022-12-01

### Fixed

- Added choice to load release or master

## [1.10.6] - 2022-12-01

### Fixed

- Support TSV7 for TN

## [1.10.5] - 2022-12-01

### Added

- license viewer

## [1.10.4] - 2022-11-11

### Changed

- limit size of font for content

## [1.10.3] - 2022-11-01

### Added

- new resource languages (Ingilo, Shughni)

### Fixed

- Updated resource path

## [1.10.2] - 2022-10-03

### Added

- new resource languages (Uzbek, Kazakh, Azerbaijani)

## [1.10.1] - 2022-09-30

### Added

- new Interface language (Ukrainian)

## [1.10.0] - 2022-09-01

### Added

- new languages (Czech, Hebrew, Hungarian)
- component Share

### Changed

- update dependencies
- default theme
- style card, made big area of right-bottom corner
- update default resources in 'es-419' language
- update localization with new words

### Fixed

- cursor in cards
- links in twl
- fix unsupported usfm verses
- show Introduction & General Notes in TN without content from TN
- closure of the draggable dialog
- context menu for OBS and Bible

## [1.9.0] - 2022-05-30

### Added

- projector-mode-rcl (show content on second screen)
- icons in main menu
- all modals support drag and drop
- new hook that checks when an element becomes visible on the screen

### Changed

- favicons

### Fixed

- removed abbreviation OBT
- scrollbar in webkit

## [1.8.0] - 2022-05-26

### Added

- Filter unique words in OBSTWL
- List references of words in OBSTWL

### Changed

- View content in TN and OBSTN

### Fixed

- Opening links in support materials

## [1.7.0] - 2022-04-29

### Added

- Filter unique words in TWL
- List references of words in TWL
- New resource languages

### Changed

- Select lanquages view

### Fixed

- Fix OBS Parser

### Remove

- List of languages and owners

## [1.6.3] - 2022-04-26

### Changed

- Add support to show the glossary

## [1.6.2] - 2022-04-06

### Added

- Show/hide expanded resource name in card title
- Add logo

### Changed

- Menu order
- Minor changes of design
- Corrected the README.md

### Fixed

- Minor changes

## [1.6.1] - 2022-04-04

### Fixed

- Minor changes

## [1.6.0] - 2022-04-04

### Added

- Support for all published resources
- Migration for support all resources
- TAcademy support
- Es-419 localization
- Copy layout
- The ability to share the layout
- Feedback Component
- Set up crowdin for localization

### Changed

- Edited User`s guide
- Using a MUI theme instead of hardcode value
- Bringing all form elements to the same view
- Update README.md

### Fixed

- Application crash if resource not found
- Default layouts for languages
- Removed unused styles
- Сhunk loading
- tQ display
- If the resource was not loaded, then an empty space was shown instead of a card
- Minor fixes in the code

### Deprecated

- List of repository owners

### Security

- Updating dependencies

## [1.5.0] - 2022-02-18

### Added

- Custom theme support
- TSV format support for OBS
- Showing chunks for all resources
- Created a settings page
- Option to hide pictures in OBS (Alt + O)

### Changed

- The ability to hide WordPopover

### Fixed

- 'Roboto' font support

## [1.4.2] - 2021-12-03

### Changed

- Update title of cards( added name of languages)
- Update the selection of resource languages

## [1.4.1] - 2021-11-25

### Added

- Show adding resources when adding languages
- Show obs-tn title comment
- Show obs-sq summary comment
- Support TSV Translation Questions

### Changed

- Update DialogUI
- Removed StrictMode as there were errors in the console

### Fixed

- Minor fixes in the code
- Clean console errors
- Update dependencies
- Colors for PWA

## [1.4.0] - 2021-11-10

### Added

- Choice of languages for resources
- Migration for language selection
- Component for dialogs
- Selection of resource languages to the first launch window
- OBS Study Questions
- OBS Study Notes
- Translation Words Links
- OBS Translation Words Links
- Tool for showing introduction and general notes in Translation Notes

### Changed

- Message about the inability to close the last resource
- Scrolling to a new card
- Removed StrictMode as there were errors in the console

### Fixed

- Minor fixes in the code
- Removed the removal of cards if they are not in the list of resources, as there was a bug with the asynchronous creation of a list of available resources
- Scrolling to verses in obs
- Line break if the resource name is too long
- Duplicate resources are hidden

## [1.3.0] - 2021-10-20

### Added

- Language selection on first boot
- Scrolldown when new card added
- Catch error with reset config
- Shortcut for clear localstorage (ctrl+shift+L)
- Migration mechanizm [#203](https://github.com/texttree/bsa/issues/203)
- Copy reference to clipboard [#218](https://github.com/texttree/bsa/issues/218)
- Tajik localisation
- More language support

### Changed

- User guide extended for OBS
- User guide update about synchronization cards
- When switched the Bible or OBS mode, after pressing the back button, the reference switched, but the resources did not
- Do not close the add resources menu automatically
- Move abbr to translation [#206](https://github.com/texttree/bsa/issues/206)
- Update resource-workspace-rcl [#207](https://github.com/texttree/bsa/issues/207)
- For ru project set default ref tit 1:1 [#208](https://github.com/texttree/bsa/issues/208)
- Color for current verse
- Don't render all current cards when another one is loaded or deleted [#211](https://github.com/texttree/bsa/issues/211)
- Color of theme in manifest

### Fixed

- Highlight the first verse at the first launch
- Remove localization in pl and ukr, cause it breaks the app
- Remove the UEB, replace it with ULT
- Fix empty place when all materials added
- Order of NT books [#205](https://github.com/texttree/bsa/issues/205)
- Show OBS header when 1st verse opened
- Scroll to verse when reset layout

## [1.2.0] - 2021-10-05

### Added

- OBS material in Tajik
- Added new interface translations
- Viewer the app version

### Fixed

- Fixed a bug when the OBS-TQ was not shown

### Security

- Updating dependencies

## [1.1.1] - 2021-09-29

### Added

- PR template

### Changed

- Style for "add resources" button
- Add new url for cache
- Highlighting the current verse

### Fixed

- Font family for card headers
- The default action when using shortcuts
- Highlighting a verse when switching to OBS
- Fix sending errors from OBS

### Security

- Updating dependencies

## [1.1.0] - 2021-09-22

### Added

- Swipes (left-right) to switch chapter on the phone
- Current reference(book,chapter,verse) of Bible/OBS in app bar: clickable and adaptive for screen size
- Select Bible/OBS mode in app bar
- Service Worker for caching requests

### Changed

- In main menu removed options for change Bible/OBS mode
- UI version of buttons in app bar
- Font style in title of cards
- Updated bible-reference-rcl version 1.1.0, added OBS support, save filter after updating the list of books
- Bundle optimization
- Lazy loading

### Fixed

- Can't perform a React state update on an unmounted component
- Switch OBS to Bible when open user guide
- If the content did not fit on the screen, then when scrolling to a verse, the main screen scrolled

### Security

- Updating dependencies

### Deprecated

### Removed

## [1.0.0] - 2021-09-02

- First release
