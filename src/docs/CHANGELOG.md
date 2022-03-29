# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.6.0] - 2022-03-30

### Added (for new features)
 - Support for all published resources
 - Migration for support all resources
 - tAcademy support
 - es-419 localization

### Fixed (for any bug fixes)
 - application crash if resource not found
 - default layouts for languages

### Deprecated (for soon-to-be removed features)
 - list of repository owners

### Security (in case of vulnerabilities)
 - Updating dependencies

## [1.5.1] - 2022-03-01

### Changed (for changes in existing functionality)
 - Edited User`s guide

### Fixed (for any bug fixes)
 - Minor fixes in the code

## [1.5.0] - 2022-02-18

### Added (for new features)
 - Custom theme support
 - TSV format support for OBS
 - Showing chunks for all resources
 - Created a settings page
 - Option to hide pictures in OBS (Alt + O)

### Changed (for changes in existing functionality)
 - The ability to hide WordPopover

### Fixed (for any bug fixes)
 - 'Roboto' font support

## [1.4.2] - 2021-12-03

### Changed (for changes in existing functionality)
 - Update title of cards( added name of languages)
 - Update the selection of resource languages

## [1.4.1] - 2021-11-25

### Added (for new features)
 - Show adding resources when adding languages
 - Show obs-tn title comment
 - Show obs-sq summary comment
 - Support TSV Translation Questions

### Changed (for changes in existing functionality)
 - Update DialogUI
 - Removed StrictMode as there were errors in the console

### Fixed (for any bug fixes)
 - Minor fixes in the code
 - Clean console errors
 - Update dependencies
 - Colors for PWA

## [1.4.0] - 2021-11-10

### Added (for new features)
 - Choice of languages for resources
 - Migration for language selection
 - Component for dialogs
 - Selection of resource languages to the first launch window
 - OBS Study Questions
 - OBS Study Notes
 - Translation Words Links
 - OBS Translation Words Links
 - Tool for showing introduction and general notes in Translation Notes

### Changed (for changes in existing functionality)
 - Message about the inability to close the last resource
 - Scrolling to a new card
 - Removed StrictMode as there were errors in the console

### Fixed (for any bug fixes)
 - Minor fixes in the code
 - Removed the removal of cards if they are not in the list of resources, as there was a bug with the asynchronous creation of a list of available resources
 - Scrolling to verses in obs
 - Line break if the resource name is too long
 - Duplicate resources are hidden

## [1.3.0] - 2021-10-20

### Added (for new features)
- Language selection on first boot
- Scrolldown when new card added
- Catch error with reset config
- Shortcut for clear localstorage (ctrl+shift+L)
- Migration mechanizm [#203](https://github.com/texttree/bsa/issues/203)
- Copy reference to clipboard [#218](https://github.com/texttree/bsa/issues/218)
- Tajik localisation
- More language support

### Changed (for changes in existing functionality)
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

### Fixed (for any bug fixes)
- Highlight the first verse at the first launch
- Remove localization in pl and ukr, cause it breaks the app
- Remove the UEB, replace it with ULT
- Fix empty place when all materials added
- Order of NT books [#205](https://github.com/texttree/bsa/issues/205)
- Show OBS header when 1st verse opened
- Scroll to verse when reset layout

## [1.2.0] - 2021-10-05

### Added (for new features)
- OBS material in Tajik
- Added new interface translations
- Viewer the app version

### Fixed (for any bug fixes)
- Fixed a bug when the OBS-TQ was not shown

### Security (in case of vulnerabilities)
- Updating dependencies

## [1.1.1] - 2021-09-29

### Added (for new features)
- PR template

### Changed (for changes in existing functionality)
- Style for "add resources" button
- Add new url for cache
- Highlighting the current verse

### Fixed (for any bug fixes)
- Font family for card headers
- The default action when using shortcuts
- Highlighting a verse when switching to OBS
- Fix sending errors from OBS

### Security (in case of vulnerabilities)
- Updating dependencies

## [1.1.0] - 2021-09-22

### Added (for new features)
- Swipes (left-right) to switch chapter on the phone
- Current reference(book,chapter,verse) of Bible/OBS in app bar: clickable and adaptive for screen size
- Select Bible/OBS mode in app bar
- Service Worker for caching requests

### Changed (for changes in existing functionality)
- In main menu removed options for change Bible/OBS mode
- UI version of buttons in app bar
- Font style in title of cards
- Updated bible-reference-rcl version 1.1.0, added OBS support, save filter after updating the list of books
- Bundle optimization
- Lazy loading

### Fixed (for any bug fixes)
- Can't perform a React state update on an unmounted component
- Switch OBS to Bible when open user guide
- If the content did not fit on the screen, then when scrolling to a verse, the main screen scrolled

### Security (in case of vulnerabilities)
- Updating dependencies

### Deprecated (for soon-to-be removed features)

### Removed (for now removed features)

## [1.0.0] - 2021-09-02

- First release
