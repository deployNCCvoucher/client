import { Invoice } from "../../../../redux/invoice/invoiceSlide";

interface TotalInter {
  total: number;
  approve: number;
  reject: number;
  pending: number;
  money: number;
}

export const DetailsMoney = (invoice: Invoice[]) => {
  const dataReduce: TotalInter[] = [];
  const types = ["30k", "50k", "100k"];
  types.forEach((type) => {
    let temp: TotalInter = {
      total: 0,
      approve: 0,
      reject: 0,
      pending: 0,
      money: 0,
    };

    invoice.forEach((item: Invoice) => {
      if (item.reducedType == type) {
        temp.total += 1;
        if (item.status == "approve") {
          temp.approve += 1;
          temp.money += +type.split("k")[0];
        } else if (item.status == "reject") {
          temp.reject += 1;
        } else {
          temp.pending += 1;
        }
      }
    });
    dataReduce.push(temp);
  });

  const dataTotal: TotalInter = {
    total: 0,
    approve: 0,
    reject: 0,
    pending: 0,
    money: 0,
  };
  dataReduce.push({...dataTotal});

  dataReduce.forEach((item) => {
    dataTotal.approve += item.approve;
    dataTotal.money += item.money;
    dataTotal.reject += item.reject;
    dataTotal.pending += item.pending;
    dataTotal.total += item.total;
  });

  dataReduce.push(dataTotal);
  return dataReduce;
};
