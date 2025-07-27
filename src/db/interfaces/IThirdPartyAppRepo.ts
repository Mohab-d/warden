import IThirdPartyAppData from "../../interface/IThirdPartyAppData";

interface IThirdPartyAppRepo {
  saveOne(data: IThirdPartyAppData): Promise<IThirdPartyAppData>;
}

export default IThirdPartyAppRepo;
