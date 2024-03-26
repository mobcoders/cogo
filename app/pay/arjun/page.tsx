import ShowCard from '@/app/pay/arjun/show-card';
import { getCardDetails, loginUser } from '@/lib/weavr';

export default async function Page() {
  const user = await loginUser();
  user.cardDetails = await getCardDetails(user.token);

  return (
    <>
      <h1>Weavr</h1>
      {user && <ShowCard user={user} />}
    </>
  );
}
