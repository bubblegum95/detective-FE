'use client';

import { useCallback, useEffect, useState } from 'react';
import SideBar from '../../../components/sideBar.component';
import styles from '../../../styles/dashboard.module.css';
import { Office } from '../../../types/userInfoState.interface';
import Image from 'next/image';
import DaumPostcodeButton from '../../../components/util/DaumPostcodeButton.component';
import { useRouter } from 'next/router';

export async function getMyOffice() {
  try {
    const token = localStorage.getItem('authorization');
    if (!token) return;

    const BASE_URL = process.env.BASE_URL;
    const res = await fetch(`${BASE_URL}/offices/my-office`, {
      headers: {
        authorization: token,
      },
    });
    const data = await res.json();

    if (!res.ok || !data.success) {
      throw new Error(data.error);
    }
    console.log(data.data);
    return data.data;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function updateOffice(form: {
  phone?: string;
  address?: string;
  addressDetail?: string;
}) {
  try {
    const token = localStorage.getItem('authorization');
    if (!token) return;

    const BASE_URL = process.env.BASE_URL;
    const res = await fetch(`${BASE_URL}/offices/my-office`, {
      headers: {
        'Content-type': 'application/json',
        authorization: token,
      },
      method: 'PATCH',
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (!res.ok || !data.success) {
      throw new Error(data.error);
    }

    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export default function MyOffice() {
  const [office, setOffice] = useState<Office | null>(null);
  const [updateForm, setUpdateForm] = useState({
    phone: '',
    address: '',
    addressDetail: '',
  });
  const router = useRouter();

  useEffect(() => {
    const handleGetOffice = async () => {
      const data = (await getMyOffice()) as Office;
      if (!data) return;
      setOffice(data);
      setUpdateForm({
        phone: data.phone,
        address: data.address,
        addressDetail: data.addressDetail,
      });
    };

    handleGetOffice();
  }, []);

  const businessFilePath = office?.businessFile.path;
  const defaultImage =
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQVBnzyBUCefWBzjFKnRTPiLetwlAkmY6cAw&s';
  const BASE_URL = process.env.BASE_URL;
  const image = businessFilePath
    ? `${BASE_URL}/images/${businessFilePath}`
    : defaultImage;

  return (
    <div className={styles.dashboard}>
      <div>
        <SideBar />
      </div>
      <div className={styles.dashboardContent}>
        <h1>Office</h1>
        <div>
          <section className={styles.officeContent}>
            <Image
              alt={'사업등록증이미지파일'}
              src={image}
              width={300}
              height={400}
              className={styles.businessFileImage}
            />

            <form action="" className={styles.updateForm}>
              <div className={styles.businessDetail}>
                <div>
                  <h3>상호명</h3>
                  <p>{office?.name}</p>
                </div>

                <div>
                  <h3>사업자등록번호</h3>
                  <p>{office?.businessNum}</p>
                </div>

                <div>
                  <h3>설립일</h3>
                  <p>{office?.founded}</p>
                </div>

                <div>
                  <h3>연락처</h3>
                  <input
                    type="text"
                    value={updateForm.phone}
                    name="phone"
                    onChange={(e) =>
                      setUpdateForm((prev) => ({
                        ...prev,
                        phone: e.target.value,
                      }))
                    }
                  />
                </div>

                <div className={styles.officeAddress}>
                  <h3>사업장</h3>
                  <input type="text" value={updateForm.address} />
                  <input type="text" value={updateForm.addressDetail} />
                </div>
              </div>

              <div className={styles.btns}>
                <DaumPostcodeButton
                  onComplete={(address) => {
                    setUpdateForm((prev) => ({ ...prev, address: address }));
                  }}
                />

                <button
                  onClick={async (e) => {
                    e.preventDefault();
                    const result = await updateOffice(updateForm);
                    if (result) alert('수정을 완료하였습니다.');
                  }}
                >
                  수정하기
                </button>
              </div>
            </form>
          </section>

          <section>
            <div>
              <div className={styles.employeesTitle}>
                <h2>직원</h2>
                <button onClick={() => {}} className={styles.addBtn}>
                  직원등록
                </button>
              </div>

              <div className={styles.employees}>
                {office?.employees?.map((employee) => (
                  <div
                    key={employee.id}
                    onClick={() => {
                      router.push(`/detectives/${employee.id}`);
                    }}
                  >
                    <div>{employee.user.name}</div>
                    <div>{employee.user.email}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
