import {
  FilterOutlined,
  DownloadOutlined,
  CalendarOutlined,
  CreditCardOutlined,
} from "@ant-design/icons";

export const options = (handleOnExport, setOpen ) => {
  return [
    {
      key: "1",
      label: "Download",
      icon: <DownloadOutlined />,
      onClick: handleOnExport,
    },
    {
      key: "2",
      label: "Filter",
      icon: <FilterOutlined />,

      children: [
        {
          key: "2.1",
          label: "By Date",
          icon: <CalendarOutlined />,
          onClick: () => setOpen(true),
        },
        {
          key: "2.2",
          label: "By Amount",
          icon: <CreditCardOutlined />,
        },
      ],
    },
  ];
};
