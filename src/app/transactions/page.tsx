import TransactionCard from "@/components/TransactionCard";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { fetchData } from "@/utils";
import { faMoneyBills, faWallet } from "@fortawesome/free-solid-svg-icons";
import { getServerSession } from "next-auth";

export default async function Trasaction() {
  const getTransaction = async () => {
    const session = await getServerSession(authOptions)
    const { data: user }: any = session?.user
    const transactions = await fetchData('transactions', 'GET', {}, user.token || '')
    return transactions.data
  }
  const transactions = await getTransaction()
  return (
    <>
      <h1 className="text-2xl font-semibold">Riwayat Transaksi</h1>
      <div className="flex flex-col gap-5 my-4">
        {transactions && transactions.map((transaction: any, index: number) => (
          <TransactionCard title={transaction.type == 'buy' ? 'Beli Tiket' : (transaction.type == "topup" ? "Isi Saldo" : 'Tarik Saldo')} key={index} icon={transaction.type == 'buy' ? faMoneyBills : faWallet} subtitle={transaction.type === 'buy' ? `${transaction.movie.title} - ${transaction.time}` : `${transaction.total_amount}`} />

        ))}
      </div>
    </>
  )
}