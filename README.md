# 🕒 FocusTune - Timer + Music Chrome Extension

FocusTune is a lightweight Chrome Extension that combines a customizable Pomodoro-style timer with local music playback — perfect for boosting focus and productivity.

---

## ✨ Features

- ⏱️ Simple Pomodoro-style countdown timer
- 🎵 Play your own music files from your local device
- 🔄 Timer and music continue even after the popup is closed
- ⚙️ Settings page to customize timer and upload music
- 💾 Uses Chrome local storage to save preferences
- 🧭 Easy to use with clean and minimal UI

---

## 📂 Folder Structure

```
FocusTune-Extension/
│
├── popup.html            # Main UI for timer and music
├── popup.js              # Timer and music logic
├── style.css             # Styling for popup
├── options.html          # Settings page
├── options.js            # Logic to save/load preferences
├── background.js         # Keeps timer/music alive when popup is closed
├── manifest.json         # Chrome extension config
└── assets/               # Local music files, icons, etc.
```

---

## 🚀 Installation Guide

1. Clone or download this repository:

```bash
git clone https://github.com/your-username/FocusTune.git
```

2. Open Google Chrome and navigate to:

```
chrome://extensions/
```

3. Enable "Developer mode" (top right)

4. Click on "Load unpacked"

5. Select the folder where you downloaded/cloned the extension

6. Done! The extension icon should now appear in your toolbar 🎉

---

## ⚙️ How to Use

1. Click the FocusTune icon in the Chrome toolbar
2. Set the desired timer duration (e.g., 25 minutes)
3. Visit the settings page and upload your favorite music files
4. Start the timer – your music will automatically play
5. Even if the popup is closed, the timer and music will continue in the background!

---

## 🛠️ Tech Stack

- HTML5 + CSS3
- JavaScript (Vanilla)
- Chrome Extension APIs:
  - alarms
  - runtime
  - storage
  - background scripts

---

## 📦 Planned Features

- ⏳ Add Pomodoro long/short breaks
- 🎚️ Volume control and repeat mode
- 🌑 Dark mode
- 📱 Responsive mobile-friendly layout
- 🔔 Sound alert when timer ends
- 🔗 Online playlist integration (YouTube/Spotify)

---

## 📄 License

This project is licensed under the MIT License.

---

## 🙌 Acknowledgements

- Inspired by the Pomodoro Technique and lo-fi music for productivity
- Chrome Extension Docs – for API guidance

---

Made with ❤️ by [Your Name]

🔗 GitHub: [github.com/your-username/FocusTune](https://github.com/your-username/FocusTune)
