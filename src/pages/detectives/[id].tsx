import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { Detective } from '../../types/userInfoState.interface';
import Image from 'next/image';
import FloatingChat from '../../components/util/floatingChat.component';
import { memo } from 'react';
import ConsultingApplication from '../../components/util/ConsultingApplication.component';
import ReviewsComponent from '../../components/detective/Review.component';
import { Heart } from 'lucide-react';
import Wishlist from '../../components/wishlist/Wishlist.component';

export const getServerSideProps: GetServerSideProps<{
  detective: Detective;
  userImage: string;
}> = async (context) => {
  const { id } = context.params as { id: string };
  const url = process.env.BASE_URL;
  const req = await fetch(`${url}/detectives/detail/${id}`);
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
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <h1 className="detective-name">{detective.user.name}</h1>
          <Wishlist detectiveId={detective.id} size={35} />
        </div>
        <h4 className="detective-subject">{detective.subject}</h4>
        <Image
          className="detective-profile"
          src={userImage}
          alt="user image"
          priority={false}
          layout="fixed"
          width={300}
          height={300}
          style={{ objectFit: 'cover', borderRadius: '50%' }}
        />
      </div>

      <div>
        <div>
          <h3>Intro</h3>
          <p className="detective-intro">{detective.intro}</p>
        </div>

        <div>
          <h3>Phone</h3>
          <p className="detective-phone">{detective.user.phoneNumber}</p>
        </div>

        <div>
          <h3>Email</h3>
          <p className="detective-email">{detective.user.email}</p>
        </div>

        <div>
          <h3>Agency</h3>
          <div>
            <p className="office-name">{detective.office?.name}</p>
            <p className="office-phone">{detective.office?.phone}</p>
            <p className="office-address">
              {detective.office?.address} {detective.office?.addressDetail}
            </p>
          </div>
        </div>

        <div>
          <h3>Licenses</h3>
          <div className="detective-licenses">
            {detective.licenses &&
              detective.licenses.map((license) => (
                <div key={license.id}>
                  <div>{license.title}</div>
                  <div>{license.issuedAt}</div>
                  <div>{license.issuedBy}</div>
                </div>
              ))}
          </div>
        </div>

        <div>
          <h3>Careers</h3>
          <div>
            {detective.careers &&
              detective.careers.map((career) => (
                <div>
                  <div>{career.company}</div>
                  <div>{career.position}</div>
                  <div>{career.job}</div>
                  <div>
                    {career.end} - {career.end}
                  </div>
                </div>
              ))}
          </div>
        </div>

        <div>
          <ConsultingApplication detectiveId={detective.id} />
        </div>
      </div>

      <div>
        <ReviewsComponent id={detective.id} />
      </div>

      {detective.user.email && (
        <MemoizedFloatingChat email={detective.user.email} />
      )}
    </div>
  );
};

const MemoizedFloatingChat = memo(FloatingChat);

export default DetectiveDetail;
