import { DiseasesPipe } from './diseases.pipe';

describe('DiseasesPipe', () => {
  it('create an instance', () => {
    const pipe = new DiseasesPipe();
    expect(pipe).toBeTruthy();
  });
});
