
  const ctx = document.getElementById('graficoQuiz').getContext('2d');
  const graficoQuiz = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['01/06 10:30', '01/06 12:00', '01/06 15:40'],
      datasets: [{
        label: 'Acertos',
        data: [3, 4, 5],
        backgroundColor: 'rgba(54, 162, 235, 0.7)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
        borderRadius: 4
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
          max: 5,
          ticks: {
            stepSize: 1
          },
          title: {
            display: true,
            text: 'Número de Acertos'
          }
        },
        x: {
          title: {
            display: true,
            text: 'Data e Hora'
          }
        }
      }
    }
  });

