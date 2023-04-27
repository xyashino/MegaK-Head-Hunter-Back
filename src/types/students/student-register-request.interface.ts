export interface StudentRegisterRequest {
  pwd: string;
  tel?: string;
  firstname: string;
  lastname: string;
  githubUsername: string;
  portfolioUrls: string[];
  projectUrls: string[];
  bio?: string;
  expectedTypeWork:
    | 'Na miejscu'
    | 'Gotowość do przeprowadzki'
    | 'Wyłącznie zdalnie'
    | 'Hybrydowo'
    | 'Bez znaczenia';
  targetWorkCity?: string;
  expectedContractType:
    | 'Tylko UoP'
    | 'Możliwe B2B'
    | 'Możliwe UZ/UoD'
    | 'Hybrydowo'
    | 'Brak preferencji';
  expectedSalary?: string;
  canTakeApprenticeship: boolean;
  monthsOfCommercialExp: number;
  education?: string;
  workExperience?: string;
  courses?: string;
  status?: 'Dostępny' | 'W trakcie rozmowy' | 'Zatrudniony';
}
