import { PieChart } from "react-minimal-pie-chart";
import { ChartI } from "../types/types";

function Chart({ data, setShowValidContract, setShowValidWarranty }: ChartI) {
  const chartData = [
    { title: "Both valid", value: data[0], color: "#42b942" },
    { title: "Contract invalid", value: data[1], color: "#ffbb00" },
    { title: "Warranty invalid", value: data[2], color: "#ff8000" },
    { title: "Both invalid", value: data[3], color: "#ff0000" },
  ];

  const defaultLabelStyle = {
    fontSize: "0.5rem",
    color: "white",
    border: "2px solid white",
  };

  function handleSegmentClicked(title: string) {
    switch (title) {
      case "Both valid":
        setShowValidContract(true);
        setShowValidWarranty(true);
        break;

      case "Contract invalid":
        setShowValidContract(false);
        setShowValidWarranty(true);
        break;

      case "Warranty invalid":
        setShowValidContract(true);
        setShowValidWarranty(false);
        break;

      default:
        setShowValidContract(false);
        setShowValidWarranty(false);
    }
  }

  return (
    <div>
      <PieChart
        style={{ cursor: "pointer" }}
        onClick={(e: any) =>
          handleSegmentClicked(e.target.firstChild.innerHTML)
        }
        data={chartData.filter((el) => el.value !== 0)}
        label={({ dataEntry }) => dataEntry.value}
        labelStyle={{
          ...defaultLabelStyle,
        }}
      />
      <div>
        {chartData.map((el, i) => (
          <div
            key={i}
            className="index"
            data-value={el.title}
            onClick={(e: any) => {
              handleSegmentClicked(e.target.dataset.value);
            }}
          >
            <div
              className="colorSegment"
              style={{
                backgroundColor: el.color,
              }}
            />
            {el.title}
            <span className="count">{el.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Chart;
