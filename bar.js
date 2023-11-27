function loadingBar(percentage) {
    const barLength = 50;
    const filledLength = Math.floor(barLength * (percentage / 100));
    const emptyLength = barLength - filledLength;
  
    const filledBar = "=".repeat(filledLength);
    const emptyBar = " ".repeat(emptyLength);
  
    const bar = `[${filledBar}${emptyBar}] ${percentage}%`;
    return bar
  }
  
  module.exports = loadingBar;
  
  
  
  
  
  /*
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  function loading(length, interval) {
  
  
  
      let string = "";
      var interval = setInterval(() => {
        console.clear();
        string += "=";
        console.log(`[${string}]`);
        if (string.length === length) {
          clearInterval(interval);
        }
      }, 250);
    }
    
  
  
  
    function showLoadingBar(percentage) {
      const barLength = 20; // Set the length of the loading bar
      const filledLength = Math.round(barLength * (percentage / 100)); // Calculate the number of filled characters
    
      // Create the loading bar string
      let loadingBar = '[';
      for (let i = 0; i < barLength; i++) {
        if (i < filledLength) {
          loadingBar += '=';
        } else {
          loadingBar += ' ';
        }
      }
      loadingBar += `] ${percentage}%`;
      return loadingBar;
      // Log the loading bar to the console
    }
  
  
    function loadingBar(duration, interval) {
      let progress = 0;
      const progressBar = setInterval(() => {
        progress++;
        if (progress >= 100) {
          clearInterval(progressBar);
          console.log("Loading complete!");
        } else {
          console.log(`Progress: ${progress}%`);
        }
      }, interval);
    }
    
  
  */