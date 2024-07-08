// app/(dashboard)/transfer/page.tsx

import { GetServerSideProps } from 'next';
import React from 'react';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../lib/auth';
import prisma from '@quickpay/db/client';
import AddMoney from '../../../components/AddMoney';
import BalanceCard from '../../../components/BalanceCard';
import { OnRampTransactions } from '../../../components/OnRampTransactions';

type Transaction = {
  time: Date;
  amount: number;
  status: string;
  provider: string;
};

type Balance = {
  amount: number;
  locked: number;
};

type TransferPageProps = {
  transactions: Transaction[];
  balance: Balance;
};

const TransferPage: React.FC<TransferPageProps> = ({ transactions, balance }) => {
  return (
    <div className="w-screen">
      <div className="text-4xl text-[#6a51a6] pt-8 mb-8 font-bold">
        Transfer
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 p-4">
        <div>
          <AddMoney />
        </div>
        <div>
          <BalanceCard amount={balance.amount} locked={balance.locked} />
          <div className="pt-4">
            <OnRampTransactions transactions={transactions} />
          </div>
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getServerSession(context.req, context.res, authOptions);
  if (!session) {
    return {
      redirect: {
        destination: '/api/auth/signin',
        permanent: false,
      },
    };
  }

  const transactions = await prisma.onRampTransaction.findMany({
    where: {
      userId: Number(session.user.id),
    },
  });

  const formattedTransactions = transactions.map((t) => ({
    time: t.startTime,
    amount: t.amount,
    status: t.status,
    provider: t.provider,
  }));

  const balance = await prisma.balance.findFirst({
    where: {
      userId: Number(session.user.id),
    },
  });

  const formattedBalance = {
    amount: balance?.amount || 0,
    locked: balance?.locked || 0,
  };

  return {
    props: {
      transactions: formattedTransactions,
      balance: formattedBalance,
    },
  };
};

export default TransferPage;
