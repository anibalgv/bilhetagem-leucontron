import sqlite from 'sqlite-sync';
import Tickets from './tickets';

export default class Reports {

  constructor() {
    if (process.env.NODE_ENV !== 'development')
      this.databasePath = process.cwd() + '/resources/extraResources/tickets.sqlite';
    else
      this.databasePath = __dirname + '/../database/tickets.sqlite';
  }

  getAtributosCount(_date_start, _date_end) {
    try {
      sqlite.connect(this.databasePath);
      const tickets = sqlite.run("SELECT atributo_ligacao, count(atributo_ligacao) AS `count` FROM `tickets` GROUP BY atributo_ligacao;");
      sqlite.close();
      console.log('[REPORTS][GETATRIBUTOSCOUNT]', tickets);
      return tickets;
    } catch (error) {
      console.log('[REPORTS][GETATRIBUTOSCOUNT] -> ERROR\n', error);
    }
  }

  getResponsavelAtributosCount(_date_start, _date_end) {
    try {
      sqlite.connect(this.databasePath);
      const tickets = sqlite.run("SELECT responsavel, nome_usuario, COUNT(responsavel) AS `count` FROM tickets WHERE atributo_ligacao LIKE('O') GROUP BY responsavel ORDER BY COUNT(responsavel) DESC;");
      sqlite.close();
      console.log('[TICKETS][GETRESPONSAVELATRIBUTOSCOUNT]', tickets);
      return tickets;
    } catch (error) {
      console.log('[REPORTS][GETRESPONSAVELATRIBUTOSCOUNT] -> ERROR\n', error);
    }
  }

  getGeneralCount(_tickets) {
    try {
      let data = [];
      let values = [];
      // let groupedTickets = [];
      let labels = [];

      const groupedTickets = _tickets.reduce(function (r, a) {
        r[a.atributo] = r[a.atributo] || [];
        r[a.atributo].push(a);
        return r;
      }, Object.create(null));
      
      // for (let [key, value] of Object.entries(groupedTickets)) {
      //   console.log(key, value.length);
      // }

      // Object.entries(groupedTickets).forEach(([key, value])=>{
      //   console.log(key, value.length);
      // });
      
      console.log('[REPORTS][GETGENERALCOUNT]', groupedTickets);
      return groupedTickets;
    } catch (error) {
      console.log('[REPORTS][GETGENERALCOUNT] -> ERROR\n', error);
      return false;
    }
  }



}