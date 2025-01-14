'use client';

import React, { useState } from 'react';
import ConsumerSignUp from '../../components/consumerSignUp.component';
import EmployeeSignUp from '../../components/employeeSignUp.component';
import EmployerSignUp from '../../components/employerSignUp.component';

export default function SignUp() {
  const [activeState, setActiveState] = useState('consumer');

  const handleActiveState = (active: string) => () => {
    setActiveState(active);
  };

  return (
    <div className="signUpForms">
      <span>
        <button onClick={handleActiveState('consumer')}>의뢰인 회원가입</button>
        <button onClick={handleActiveState('employee')}>
          탐정 직원 회원가입
        </button>
        <button onClick={handleActiveState('employer')}>사장님 회원가입</button>
      </span>
      <ConsumerSignUp isActive={activeState === 'consumer'} />
      <EmployeeSignUp isActive={activeState === 'employee'} />
      <EmployerSignUp isActive={activeState === 'employer'} />
    </div>
  );
}
