export const revalidate = 0;

import { redirect } from 'next/navigation';
import { getPaginatedOrders, getPaginatedUsers } from '@/actions';
import { Title } from '@/components';
import { UsersTable } from './ui/UsersTable';

export default async function OrderPage() {

  const {ok, users = []} = await getPaginatedUsers()

  if (!ok) {
    redirect('/auth/login')
  }


  

  return (
    <>
      <Title title="Mantenimiento de usuarios" />

      <div className="mb-10">
       <UsersTable users={users}/>
      </div>
    </>
  );
}