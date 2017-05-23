import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

//VO
import { taskVO } from '../VO/taskVO';
import { boardVO } from '../VO/boardVO';

export const lstBoardVO: boardVO[] = [
  {id: 1, boardId: 'BAD_1', boardNm:'Board 1'},
  {id: 2, boardId: 'BAD_2', boardNm:'Board 2'},
  {id: 3, boardId: 'BAD_3', boardNm:'Board 3'}
];

export const lstTaskVO: taskVO[] = [
  {id: 1, boardId: 'BAD_1', taskId:'TSK_1', taskNm:'Task 1',taskSts: 'In Process'},
  {id: 1, boardId: 'BAD_1', taskId:'TSK_2', taskNm:'Task 2',taskSts: 'Complete'},
  {id: 1, boardId: 'BAD_1', taskId:'TSK_3', taskNm:'Task 3',taskSts: 'In Process'},
  {id: 1, boardId: 'BAD_1', taskId:'TSK_4', taskNm:'Task 4',taskSts: 'In Process'},
  {id: 1, boardId: 'BAD_2', taskId:'TSK_5', taskNm:'Task 5',taskSts: 'In Process'},
  {id: 1, boardId: 'BAD_2', taskId:'TSK_6', taskNm:'Task 6',taskSts: 'In Process'}
];

@Injectable()
export class TaskService {
  private apiWebService = 'http://localhost:8080/api';  // URL to web api
  constructor(private http: Http) { }

  getLstBoard():Promise<boardVO[]>{
    return Promise.resolve(lstBoardVO);
  }

  getLstTask():Promise<taskVO[]>{
    return Promise.resolve(lstTaskVO);
  }

  // getHeroes(): Promise<heroVO[]> {
  //   return Promise.resolve(lstHeroVO);
  //   //return new Promise(resolve => {setTimeout(()=>resolve(lstHeroVO),2000)})
  // }

  // getHeroes(){
  //   return this.http.get(this.heroesUrl).map(
  //     (res)=> res.json()
  //   )
  // }

    getHeroes():Promise<boardVO[]>{
    return this.http.get(this.apiWebService)
               .toPromise()
               .then(res=> res.json())
               .catch(this.handleError);
  }

    private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

  // getHeroe(id: number): Promise<heroVO> {
  //   return this.getHeroes()
  //            .then(heroes => heroes.find(hero => hero.id === id));
  // }

  getHero(id: number): Promise<boardVO> {
    const url = `${this.apiWebService}/${id}`;
    return this.http.get(url)
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  private headers = new Headers({'Content-Type': 'application/json'});
  update(hero: boardVO): Promise<boardVO> {
    const url = `${this.apiWebService}/${hero.id}`;
    return this.http
      .put(url, JSON.stringify(hero), {headers: this.headers})
      .toPromise()
      .then(() => hero)
      .catch(this.handleError);
  }

  create(name:String): Promise<boardVO> {
     return this.http
    .post(this.apiWebService, JSON.stringify({name: name}), {headers: this.headers})
    .toPromise()
    .then(res => res.json())
    .catch(this.handleError);
  }

  delete(id: number): Promise<void> {
    const url = `${this.apiWebService}/${id}`;
    return this.http
      .delete(url,  {headers: this.headers})
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }
}
