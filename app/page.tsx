import AreaList from '../components/areaList.component';
import SpecialtyList from '../components/specialtyList.component';

export default function Home() {
  return (
    <div className="Home">
      <div>
        <AreaList />
      </div>
      <div>
        <SpecialtyList />
      </div>
    </div>
  );
}
