/*jshint esversion: 6 */

(function () {
    'use strict';

    console.log('Deploy Start...');
    
    const fs = require('fs-extra');
    const deployFolder = 'C:\\WebApps\\RazorPinnacleReact';

    // Sync:
    try {
        fs.copySync('./build', deployFolder);
        console.log('success!');
    } catch (err) {
        console.error(err);
    }
 }());
