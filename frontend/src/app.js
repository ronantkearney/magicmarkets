import MMarketsNav from './MMarketsNav.js';
import MMarketsSlot from './MMarketsSlot.js';

navigator.serviceWorker.register('/mm-worker.js').
    then(registration => console.log('registration succeeded', registration)).
    catch(error => console.error('registration not successful',error));