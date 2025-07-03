import IThirdPartyAppData from "../IThirdPartyAppData";

interface IThirdPartyAppRepo {
  saveOne(data: IThirdPartyAppData): Promise<IThirdPartyAppData>;
}

export default IThirdPartyAppRepo;
