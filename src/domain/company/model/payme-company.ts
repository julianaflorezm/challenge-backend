import { Company } from "./company";

export class PymeCompany extends Company {
   getType(): string {
    return 'PYME'
   }
}