import { DataI } from "../types/types";

function ItemsContainer({ data }: { data: DataI[] }) {
  return (
    <tbody>
      {data.map((el, i) => (
        <tr key={i}>
          <td>{el.id}</td>
          <td>{el.customer}</td>
          <td>{el.asset_type}</td>
          <td>{el.serial_number}</td>
          <td>{el.service_contract ? "✅" : "❌"}</td>
          <td>{el.warranty ? "✅" : "❌"}</td>
        </tr>
      ))}
    </tbody>
  );
}

export default ItemsContainer;
