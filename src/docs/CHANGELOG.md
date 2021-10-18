# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.3.0] - 2021-10-18

### Added (for new features)
- Language selection on first boot
- Scrolldown when new card added
- Catch error with reset config
- Shortcut for clear localsotrage (ctrl+shift+L)
- Migration mechanizm [#203](https://github.com/texttree/bsa/issues/203)


### Changed (for changes in existing functionality)
- User guide extended for OBS
- User guide update about synchronization cards
- When switched the Bible or OBS mode, after pressing the back button, the reference switched, but the resources did not
- Do not close the add resources menu automatically
- Move abbr to translation [#206](https://github.com/texttree/bsa/issues/206)
- Update resource-workspace-rcl [#207](https://github.com/texttree/bsa/issues/207)
- For ru project set default ref tit 1:1 [#208](https://github.com/texttree/bsa/issues/208)
- Color for current verse

### Fixed (for any bug fixes)
- Highlight the first verse at the first launch
- Remove localization in pl and ukr, cause it breaks the app
- Remove the UEB, replace it with ULT
- Fix empty place when all materials added
- Order of NT books [#205](https://github.com/texttree/bsa/issues/205)

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
