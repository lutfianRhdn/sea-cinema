'use client'
import TransactionCard from "@/components/TransactionCard";
import { fetchData } from "@/utils";
import { faMoneyBills, faWallet } from "@fortawesome/free-solid-svg-icons";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default  function Trasaction() {
  const [transactions, setTransactions] = useState([])
  const {data:session} = useSession()
 
  useEffect(() => { 
    if (!!!session) return
    const {data:user} :any = session?.user
    fetchData('/transactions', 'GET', {}, user.token).then((res) => {
      setTransactions(res.data.map((item: any) => {
        switch (item.type) {
          case 'buy':
            item.type = 'Beli Tiket'
            break
          case 'refund':
            item.type = 'Pengembalian Tiket'
            break
          case 'topup':
            item.type = 'Isi Saldo'
            break

          case 'withdraw':
            item.type = 'Tarik Saldo'
            break
          default:
            item.type = 'Transaksi'
            break
        }
        return {...item}
      }))
      
    })
  },[session])
  return (
    <>
      <h1 className="text-2xl font-semibold">Riwayat Transaksi</h1>
      <div className="flex flex-col gap-5 my-4">
        {transactions && transactions.map((transaction: any, index: number) => (
          <TransactionCard title={transaction.type} key={index} icon={transaction.type === "Isi Saldo" || transaction.type === "Tarik Saldo"?faWallet:faMoneyBills} subtitle={transaction.type === 'buy' ? `${transaction.movie.title} - ${transaction.time}` : `${transaction.total_amount}`} />

        ))}
      </div>
    </>
  )
}