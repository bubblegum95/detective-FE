import AreaList from './areaList.component';
import SpecialtyList from './specialtyList.component';

const Content = () => {
  return (
    <div className="content">
      <div>
        <AreaList />
      </div>
      <div>
        <SpecialtyList />
      </div>
    </div>
  );
};

export default Content;
