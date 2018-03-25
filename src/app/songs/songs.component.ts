// ng
import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
// Angular material
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
// services
import { DataService } from './../shared/data.service';

@Component({
  selector: 'app-songs',
  templateUrl: './songs.component.html',
  styleUrls: ['./songs.component.scss']
})
export class SongsComponent implements OnInit {

  songs: any[];
  displayedColumns = ['thumbnail', 'artistName', 'trackName', 'collectionName', 'trackPreview'];
  dataSource: MatTableDataSource<any[]>;
  userMessage: string;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private dataService: DataService) {
  }

  ngOnInit() {
    this.dataService.getSongsfromAPI().subscribe(response => {
      this.songs = response['results'].filter(item => item.wrapperType === "track");
      this.dataSource = new MatTableDataSource(this.songs);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      localStorage.setItem('# of songs from iTunesAPI', this.songs.length.toString() );
      localStorage.setItem('table pageSize', this.paginator.pageSize.toString() );
    });
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

}


