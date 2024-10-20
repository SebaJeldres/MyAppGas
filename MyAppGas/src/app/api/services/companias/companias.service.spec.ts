import { TestBed } from "@angular/core/testing";
import { CompaniasService } from "./companias.service"


describe('CompaniasService', () => {
    let service: CompaniasService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(CompaniasService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});