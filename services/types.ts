export interface FilmsData {
  content: [
    {
      id: number;
      year: number;
      title: string;
      studios: string[];
      producers: string[];
      winner: boolean;
    }
  ];
  pageable: {
    sort: {
      sorted: boolean;
      unsorted: boolean;
    };
    pageSize: number;
    pageNumber: number;
    offset: number;
    paged: boolean;
    unpaged: boolean;
  };
  totalElements: number;
  last: boolean;
  totalPages: number;
  first: boolean;
  sort: {
    sorted: boolean;
    unsorted: boolean;
  };
  number: number;
  numberOfElements: number;
  size: number;
}

export interface MultipleWinners {
  years: [
    {
      year: number;
      winnerCount: number;
    }
  ];
}

export interface Studios {
  studios: [
    {
      name: number;
      winCount: number;
    }
  ];
}

export interface IntervalProducers {
  min: [
    {
      producer: string;
      interval: number;
      previousWin: number;
      followingWin: number;
    }
  ];
  max: [
    {
      producer: string;
      interval: number;
      previousWin: number;
      followingWin: number;
    }
  ];
}

export interface FilmByYear {
  id: number;
  year: number;
  title: string;
  studios: string[];
  producers: string[];
  winner: true;
}
