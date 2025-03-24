'use client';

import React, { memo, useCallback, useState } from 'react';
import ConsumerSignUp from '../../components/auth/consumerSignUp.component';
import EmployeeSignUp from '../../components/auth/employeeSignUp.component';
import EmployerSignUp from '../../components/auth/employerSignUp.component';

const SignUp = () => {
  const [activeState, setActiveState] = useState('consumer');
  const MemosizedConsumer = memo(ConsumerSignUp);
  const MemoizedEmployee = memo(EmployeeSignUp);
  const MemoizedEmployer = memo(EmployerSignUp);

  const handleActiveState = useCallback(
    (active: string) => () => {
      setActiveState(active);
    },
    []
  );

  return (
    <div className="signUpForms">
      <span>
        <button onClick={handleActiveState('consumer')}>의뢰인 회원가입</button>
        <button onClick={handleActiveState('employee')}>
          탐정 직원 회원가입
        </button>
        <button onClick={handleActiveState('employer')}>사장님 회원가입</button>
      </span>
      <MemosizedConsumer isActive={activeState === 'consumer'} />
      <MemoizedEmployee isActive={activeState === 'employee'} />
      <MemoizedEmployer isActive={activeState === 'employer'} />
    </div>
  );
};

export default memo(SignUp);
