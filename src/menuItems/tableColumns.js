export const payColumns = [
  {
    title: "Payment ID",
    dataIndex: "id",
    key: "id",
    sorter: (a, b) => a.id - b.id,
  },
  {
    title: "date",
    dataIndex: "date",
    key: "date",
    sorter: (a, b) => {
      const date1 = new Date(a.date);
      const date2 = new Date(b.date);
      return date1 > date2 ? 1 : -1;
    },
  },
  {
    title: "amount",
    dataIndex: "amount",
    key: "amount",

    sorter: (a, b) => a.amount - b.amount,
    render: (record) => {
      return `$${record.toFixed(2)}`;
    },
  },
  {
    title: "method",
    dataIndex: "method",
    key: "method",
  },
];

export const timeColumns = [
  {
    title: "ID",
    dataIndex: "id",
    width: "7%",
    sorter: (a, b) => a.id - b.id,
  },
  {
    title: "Date",
    dataIndex: "date",
    width: "15%",
    sorter: (a, b) => {
      const date1 = new Date(a.date);
      const date2 = new Date(b.date);
      return date1 > date2 ? -1 : 1;
    },
  },
  {
    title: "Time In",
    dataIndex: "timeIn",
    key: "In",
    width: "20%",
  },
  {
    title: "Time Out",
    dataIndex: "timeOut",
    key: "out",
    width: "20%",
    render: (value) => {
      if (value === "Invalid date") {
        return <div style={{ color: "red" }}>Missing Punch</div>;
      } else return value;
    },
  },
  {
    title: "Duration",
    dataIndex: "duration",
    key: "duration",
    width: "20%",
    sorter: (a, b) => {
      return a.duration > b.duration ? -1 : 1;
    }
  },
  {
    title: "Total",
    dataIndex: "total",
    key: "total",
    render: (value) => {
      return isNaN(value) ? "" : `$${value.toFixed(2)}`;
    },
  },
];
