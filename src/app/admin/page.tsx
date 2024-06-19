import { DashboardCard } from "@/app/admin/_components/DashboardCard";
import db from "@/db/db";
import { formatCurrency, formatNumber } from "../../lib/formattets";
import { wait } from "@/lib/wait";

const getSalesData = async () => {
  const data = await db.order.aggregate({
    _sum: { pricePaidInCents: true },
    _count: true
  });

  return {
    amount: (data._sum.pricePaidInCents || 0) / 100,
    numberOfSales: data._count
  }
}

const getUsersData = async () => {
  const count = await db.user.count();
  return {
    count: count
  }
}

const getProductData = async () => {
  const [activeCount, inactiveCount] = await Promise.all([
    db.product.count({ where: { isAvailableForPurchase: true } }),
    db.product.count({ where: { isAvailableForPurchase: false } })
  ]);

  return {
    activeCount,
    inactiveCount
  }
}

export default async function AdminDashboard() {
  const [
    users,
    salesData,
    productData
  ] = await Promise.all([getUsersData(), getSalesData(), getProductData()]);

  await wait(200);

  const averageValuePerUser = users.count === 0 ? 0 : salesData.amount / users.count;
  console.log('usersCount: ', users, salesData);

  return <div className='grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
    <DashboardCard
      title='Sales'
      subtitle={`${formatNumber(salesData.numberOfSales)} Orders`}
      body={formatCurrency(salesData.amount)}
    />
    <DashboardCard
      title='Customers'
      subtitle={`${formatCurrency(averageValuePerUser)} Average Value`}
      body={formatCurrency(salesData.amount)}
    />
    <DashboardCard
      title='Active Products'
      subtitle={`${formatNumber(productData.inactiveCount)} Inactive`}
      body={formatNumber(productData.activeCount)}
    />

  </div>
}

