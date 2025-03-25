import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { Detective } from '../../types/userInfoState.interface';
import Image from 'next/image';

export const getServerSideProps: GetServerSideProps<{
  detective: Detective;
}> = async (context) => {
  const { id } = context.params as { id: string };
  const url = process.env.BASE_URL;
  const req = await fetch(`${url}/detectives/${id}`);
  const res = await req.json();
  const detective: Detective = res.data;
  console.log(detective);
  return { props: { detective } };
};

const DetectiveDetail = ({
  detective,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  if (!detective) return <p>탐정을 찾을 수 없습니다.</p>;
  const url = process.env.BASE_URL;
  const defaultImage =
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQVBnzyBUCefWBzjFKnRTPiLetwlAkmY6cAw&s';
  const userImage = detective.profile
    ? `${url}/public/images/${detective.profile.path}`
    : defaultImage;

  return (
    <div>
      <h1>{detective.user.name}</h1>
      <h4>{detective.subject}</h4>
      <Image
        src={userImage}
        alt="user image"
        priority={false}
        layout="intrinsic"
        width={300}
        height={0}
      />
      <p>{detective.intro}</p>
      <p>{detective.office?.name}</p>
      <p>{detective.office?.phone}</p>
      <p>
        {detective.office?.address} {detective.office?.addressDetail}
      </p>
      <p>
        {detective.licenses.map((license) => (
          <div key={license.id}>{license.name}</div>
        ))}
      </p>
    </div>
  );
};

export default DetectiveDetail;
