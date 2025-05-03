import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { Detective } from '../../types/userInfoState.interface';
import Image from 'next/image';
import FloatingChat from '../../components/util/floatingChat.component';
import { memo } from 'react';
import ConsultingApplication from '../../components/util/ConsultingApplication.component';
import ReviewsComponent from '../../components/detective/Review.component';
import Wishlist from '../../components/wishlist/Wishlist.component';
import styles from '../../styles/DetectiveDetails.module.css';
import Map from '../../components/util/Map.component';

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
    <div className={styles.container}>
      <div className={styles.detectiveDataContainer}>
        <div className={styles.detectiveData}>
          <div>
            <h1 className={styles.detectiveSubject}>{detective.subject}</h1>
          </div>

          <div>
            <h3>Intro</h3>
            <p className="detective-intro">{detective.intro}</p>
          </div>

          <div>
            <h3>Licenses</h3>
            <div className="detective-licenses">
              {detective.licenses &&
                detective.licenses.map((license) => (
                  <div key={license.id}>
                    <p>자격증명: {license.title}</p>
                    <p>발급일: {license.issuedAt}</p>
                    <p>발급기관: {license.issuedBy}</p>
                  </div>
                ))}
            </div>
          </div>

          <div>
            <h3>Careers</h3>
            <div>
              {detective.careers &&
                detective.careers.map((career) => (
                  <div key={career.id}>
                    <p>근무지: {career.company}</p>
                    <p>직책: {career.position}</p>
                    <p>직무: {career.job}</p>
                    <p>
                      근무기간:
                      {career.end} - {career.end}
                    </p>
                  </div>
                ))}
            </div>
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
            {detective.office &&
              detective.office.address &&
              detective.office.name && (
                <Map
                  address={detective.office?.address}
                  name={detective.office.name}
                />
              )}
          </div>

          <div>
            <h3>Categories</h3>
            <div className={styles.tags}>
              {detective.detectiveCategories?.map((category) => (
                <span key={category.id} className={styles.tag}>
                  {category.name}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h3>Regions</h3>
            <div className={styles.tags}>
              {detective.detectiveRegions?.map((region) => (
                <span key={region.id} className={styles.tag}>
                  {region.name}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h3>Equipments</h3>
            <div className={styles.tags}>
              {detective.detectiveEquipments?.map((equipment) => (
                <span key={equipment.id} className={styles.tag}>
                  {equipment.name}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className={styles.titleSection}>
          <Image
            className={styles.detectiveImage}
            src={userImage}
            alt="user image"
            priority={false}
            layout="fixed"
            width={250}
            height={250}
            style={{ objectFit: 'cover', borderRadius: '50%' }}
          />

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <h2 className={styles.detectiveName}>{detective.user.name}</h2>
            <Wishlist detectiveId={detective.id} size={35} />
          </div>

          <div>
            <ConsultingApplication detectiveId={detective.id} />
          </div>

          <div>
            <p className="detective-phone">{detective.user.phoneNumber}</p>
            <p className="detective-email">{detective.user.email}</p>
          </div>
        </div>
      </div>

      <div className={styles.reviewContainer}>
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
