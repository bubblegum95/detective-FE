import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { Detective } from '../../types/userInfoState.interface';
import Image from 'next/image';
import FloatingChat from '../../components/util/floatingChat.component';
import { memo } from 'react';

export const getServerSideProps: GetServerSideProps<{
  detective: Detective;
  userImage: string;
}> = async (context) => {
  const { id } = context.params as { id: string };
  const url = process.env.BASE_URL;
  const req = await fetch(`${url}/detectives/${id}`);
  const res = await req.json();
  const detective: Detective = res.data;

  const defaultImage =
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQVBnzyBUCefWBzjFKnRTPiLetwlAkmY6cAw&s';
  const userImage = detective.profile
    ? `${url}/public/images/${detective.profile.path}`
    : defaultImage;

  return { props: { detective, userImage } };
};

const DetectiveDetail = ({
  detective,
  userImage,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  if (!detective) return <p>탐정을 찾을 수 없습니다.</p>;

  return (
    <div>
      <h1 className="detective-name">{detective.user.name}</h1>
      <h4 className="detective-subject">{detective.subject}</h4>
      <Image
        className="detective-profile"
        src={userImage}
        alt="user image"
        priority={false}
        layout="intrinsic"
        width={300}
        height={0}
      />
      <p className="detective-intro">{detective.intro}</p>
      <p className="detective-phone">{detective.user.phoneNumber}</p>
      <p className="detective-email">{detective.user.email}</p>
      <p className="office-name">{detective.office?.name}</p>
      <p className="office-phone">{detective.office?.phone}</p>
      <p className="office-address">
        {detective.office?.address} {detective.office?.addressDetail}
      </p>
      <p className="detective-licenses">
        {detective.licenses.map((license) => (
          <div key={license.id}>{license.name}</div>
        ))}
      </p>

      {detective.user.email && (
        <MemoizedFloatingChat email={detective.user.email} />
      )}
    </div>
  );
};

// FloatingChat의 불필요한 리렌더링 방지
const MemoizedFloatingChat = memo(FloatingChat);

export default DetectiveDetail;
