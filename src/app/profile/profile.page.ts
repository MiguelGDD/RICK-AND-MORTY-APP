import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  profiledId: string;
  characters;

  constructor(
    private activatedRoute: ActivatedRoute,
    private http: HttpClient,
    public loadingController: LoadingController,
  ) {}

  ngOnInit() {
    this.presentLoading();
    this.profiledId = this.activatedRoute.snapshot.paramMap.get('id');
    this.http
      .get('https://rickandmortyapi.com/api/character/' + this.profiledId)
      .subscribe(res => this.characters = res);
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Please wait...',
      duration: 200
    });
    return await loading.present();
  }
}
