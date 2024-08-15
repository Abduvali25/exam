export const data = {
  labels: [
    "8:45 am",
    "9:15 am",
    "09:45 am",
    "10:15 am",
    "10:45 am",
    "11:15 am",
    "11:45 am",
    "12:15 am",
    "12:45 am",
    "1:15 pm",
    "1:45 pm",
    "2:15 pm",
    "2:45 pm",
    "3:15 pm",
    "3:45 pm",
    "4:15 pm",
    "4:45 pm",
    "5:15 pm",
    "5:45 pm",
    "6:15 pm",
    "6:45 pm",
    "7:15 pm",
    "7:45 pm",
    "8:15 pm",
  ],
  datasets: [
    {
      label: "Price (Past 1 Day) in INR",
      data: [
        2920000, 2940000, 2960000, 2980000, 2980000, 3000000, 3020000, 3040000,
        3060000, 3080000,
      ],
      fill: false,
      borderColor: "rgba(75,192,192,1)",
      tension: 0.1,
    },
  ],
};

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Coin value",
    },
  },
};
