/**
 * @param {number} alpha Indicated the transparency of the color
 * @returns {string} A string of the form 'rgba(240, 50, 123, 1.0)' that represents a color
 */
function random_color(alpha = 1.0) {
  const r_c = () => Math.round(Math.random() * 255);
  return `rgba(${r_c()}, ${r_c()}, ${r_c()}, ${alpha}`;
}

function getNrandom_colors(n, alpha = 1.0) {
  const colors = [];
  for (let i = 0; i < n; i++) {
    colors.push(random_color(alpha));
  }
  return colors;
}

Chart.defaults.font.size = 16;

// We obtain a reference to the canvas that we are going to use to plot the chart.
const ctx = document.getElementById('firstChart'); //.getContext('2d');

// To plot a chart, we need a configuration object that has all the information that the chart needs.
const firstChart = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [
      {
        label: '# of Votes',
        data: [12, 19, 3, 5, 2, 8],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  },
  options: {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  },
});

/*
try
{
    const response = await fetch('http://127.0.0.1:4200/api/leaderboard',{method: 'GET'});
    let results = await response.json();

    console.log(results);
    
    

}
catch(error)
{
    console.log(error)
}*/

// To plot data from an API, we first need to fetch a request, and then process the data.

try {
  const response = await fetch(
    // protocol to https contidionally
    '159.89.80.142:4200/api/leaderboard',
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    }
  );

  if (response.ok) {
    console.log('Response is ok. Converting to JSON.');

    const results = await response.json();

    console.log(results);
    console.log('Data converted correctly. Plotting chart.');

    // In this case, we just separate the data into different arrays using the map method of the values array. This creates new arrays that hold only the data that we need.
    const SSleaders = results['Seaside'].map(e => e['NombreUsuario']);
    const SSmaxWave = results['Seaside'].map(e => e['MaxOrda']);

    const Vleaders = results['Village'].map(e => e['NombreUsuario']);
    const VmaxWave = results['Village'].map(e => e['MaxOrda']);

    const EFleaders = results['EnchantedForest'].map(e => e['NombreUsuario']);
    const EFmaxWave = results['EnchantedForest'].map(e => e['MaxOrda']);

    let colors = getNrandom_colors(5);

    //const level_completion = results.map(e => e['completion_rate'])

    const ctx_levels1 = document.getElementById('apiChart1').getContext('2d');
    const levelChart1 = new Chart(ctx_levels1, {
      type: 'bar',
      data: {
        labels: SSleaders,
        datasets: [
          {
            label: 'Seaside Leaderboard',
            backgroundColor: colors,
            borderColor: 'rgb(0, 0, 0)',
            borderWidth: 2,
            data: SSmaxWave,
          },
        ],
      },
      options: {
        indexAxis: 'y',
      },
    });

    colors = getNrandom_colors(5);
    const ctx_levels2 = document.getElementById('apiChart2').getContext('2d');
    const levelChart2 = new Chart(ctx_levels2, {
      type: 'bar',
      data: {
        labels: Vleaders,
        datasets: [
          {
            label: 'Village Leaderboard',
            backgroundColor: colors,
            borderColor: 'rgb(0, 0, 0)',
            borderWidth: 2,
            data: VmaxWave,
          },
        ],
      },
      options: {
        indexAxis: 'y',
      },
    });

    colors = getNrandom_colors(5);
    const ctx_levels3 = document.getElementById('apiChart3').getContext('2d');
    const levelChart3 = new Chart(ctx_levels3, {
      type: 'bar',
      data: {
        labels: EFleaders,
        datasets: [
          {
            label: 'Enchanted Forest Leaderboard',
            backgroundColor: colors,
            borderColor: 'rgb(0, 0, 0)',
            borderWidth: 2,
            data: EFmaxWave,
          },
        ],
      },
      options: {
        indexAxis: 'y',
      },
    });
  }

  const response1 = await fetch(
    'http://159.89.80.142:4200/api/mapStats',
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    }
  );

  if (response1.ok) {
    console.log('Response is ok. Converting to JSON.');

    const results = await response1.json();

    console.log(results);
    console.log('Data converted correctly. Plotting chart.');

    const mapsName = results.map(e => e['NombreMapa']);
    const mapsValue = results.map(e => e['Count']);
    const colors = getNrandom_colors(mapsName.length);

    const ctx_levels1 = document.getElementById('apiChart4').getContext('2d');
    const levelChart1 = new Chart(ctx_levels1, {
      type: 'pie',
      data: {
        labels: mapsName,
        datasets: [
          {
            label: 'Times played',
            backgroundColor: colors,
            borderColor: 'rgb(0, 0, 0)',
            borderWidth: 2,
            data: mapsValue,
          },
        ],
      },
    });
  }

  const response2 = await fetch(
    'http://159.89.80.142:4200/api/cardStats',
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    }
  );

  if (response2.ok) {
    console.log('Response is ok. Converting to JSON.');

    const results = await response2.json();

    console.log(results);
    console.log('Data converted correctly. Plotting chart.');

    const cardName = results.map(e => e['cardName']);
    const cardValue = results.map(e => e['Count']);
    const colors = getNrandom_colors(cardName.length);

    const ctx_levels1 = document.getElementById('apiChart5').getContext('2d');
    const levelChart1 = new Chart(ctx_levels1, {
      type: 'bar',
      data: {
        labels: cardName,
        datasets: [
          {
            label: 'Times used in decks',
            backgroundColor: colors,
            borderColor: 'rgb(0, 0, 0)',
            borderWidth: 2,
            data: cardValue,
          },
        ],
      },
    });
  }
} catch (error) {
  console.log(error);
}
