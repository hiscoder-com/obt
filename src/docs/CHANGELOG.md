# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.2.1] - 2021-10-...

### Added (for new features)
- Language selection on first boot


### Changed (for changes in existing functionality)
- User guide extended for OBS
- User guide update about synchronization cards


### Fixed (for any bug fixes)
- Remove localization in pl and ukr, cause it breaks the app

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
