import internal from "stream";

export interface Municipality {
    id: string;
    district_name: string;
    name: string;
}
export interface City {
    id: string;
    name: string;
    population: BigInteger;
}
