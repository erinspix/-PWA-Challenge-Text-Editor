const butInstall = document.getElementById('buttonInstall');
let deferredPrompt;

// This one's for installing the app as a PWA
window.addEventListener('beforeinstallprompt', (event) => {
  event.preventDefault();
  deferredPrompt = event;
  butInstall.style.display = 'block';
});

// Show the install prompt when clicking the button
butInstall.addEventListener('click', async () => {
  butInstall.style.display = 'none';
  if (deferredPrompt) {
    deferredPrompt.prompt();
    const choiceResult = await deferredPrompt.userChoice;
    if (choiceResult.outcome === 'accepted') {
      console.log('User accepted the install!');
    } else {
      console.log('User dismissed the install.');
    }
    deferredPrompt = null;
  }
});

// Confirm the app is installed
window.addEventListener('appinstalled', () => {
  console.log('App installed successfully!');
  butInstall.style.display = 'none';
});
