import AreaList from '../components/home/areaList.component';
import SpecialtyList from '../components/home/specialtyList.component';

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
