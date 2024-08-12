# belly-button-challenge

## Background

In this assignment, we build an interactive dashboard to explore a Belly Button Biodiversity dataset which catalogs the microbes that colonize human navels.

The dataset reveals that a small handful of microbial species (also called operational taxonomic units, or OTUs, in the study) were present in more than 70% of people, while the rest were relatively rare.

## Instructions

1. Using the D3 library, read in `samples.json` from the URL https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json.

2. Create a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual.

3. Create a bubble chart that displays each sample.

4. Display the sample's metadata, i.e., an individual's demographic information.

5. Update all the plots when a new sample is selected.

## Folders and Files

1. **[`index.html`](https://github.com/blmccourt/belly-button-challenge/blob/main/index.html)**

- HTML file to render web page with plots.

2. **[`samples.json`](https://github.com/blmccourt/belly-button-challenge/blob/main/samples.json)**

- Provided data from starter files.

3. **[static/js](https://github.com/blmccourt/belly-button-challenge/tree/main/static/js)**

- Folder with the JavaScript [`app.js`](https://github.com/blmccourt/belly-button-challenge/blob/main/static/js/app.js) file with logic for HTML rendering.