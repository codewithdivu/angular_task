import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Product } from '../../../models/Product';
import { MatCheckboxModule } from '@angular/material/checkbox';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import {
  MatChipEditedEvent,
  MatChipInputEvent,
  MatChipsModule,
} from '@angular/material/chips';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { ChangeDetectionStrategy, inject, signal } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpResponse,
} from '@angular/common/http';
import { NavigationService } from '../../../Services/Navigation.Service';
import { ActivatedRoute, UrlSegment } from '@angular/router';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatCheckboxModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatChipsModule,
  ],
  templateUrl: './create.component.html',
  styleUrl: './create.component.css',
})
export class CreateComponent {
  readonly addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  readonly announcer = inject(LiveAnnouncer);
  token = localStorage.getItem('myAppToken');

  isEditMode: boolean = false;
  isViewMode: boolean = false;
  productId: string | null = null;

  productForm: FormGroup;
  product: Product = {
    name: '',
    description: '',
    price: 0,
    category: '',
    inStock: false,
    quantity: 0,
    tags: [],
  };

  validationMessages = {
    name: {
      required: 'Product name is required.',
    },
    price: {
      required: 'Price is required.',
      min: 'Price must be greater than zero.',
    },
    category: {
      required: 'Category is required.',
    },
    quantity: {
      required: 'Quantity is required.',
      min: 'Quantity must be greater than zero.',
    },
  };

  constructor(
    private FormBuilder: FormBuilder,
    private http: HttpClient,
    private navigationService: NavigationService,
    private route: ActivatedRoute
  ) {
    this.productForm = this.FormBuilder.group({
      name: [this.product.name, Validators.required],
      description: [this.product.description],
      price: [this.product.price, [Validators.required, Validators.min(0.01)]],
      category: [this.product.category, Validators.required],
      inStock: [this.product.inStock],
      quantity: [
        this.product.quantity,
        [Validators.required, Validators.min(1)],
      ],
      tags: [this.product.tags],
    });
  }

  ngOnInit(): void {
    this.route.url.subscribe((url: UrlSegment[]) => {
      this.isEditMode = url.some((segment) => segment.path === 'edit');
      this.isViewMode = url.some((segment) => segment.path === 'view');
    });

    this.route.paramMap.subscribe((params) => {
      this.productId = params.get('id');
    });

    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${this.token}`
    );

    if (this.productId != null) {
      this.http
        .get(`http://localhost:8888/api/v1/product/${this.productId}`, {
          headers,
        })
        .subscribe(
          (res: any) => {
            const productData = res.data;
            this.productForm.patchValue({
              name: productData.name,
              description: productData.description,
              price: productData.price,
              category: productData.category,
              inStock: productData.inStock,
              quantity: productData.quantity,
              tags: productData.tags,
            });
          },
          (error: HttpErrorResponse) => {
            console.log('error', error);
          }
        );
    }
  }
  submitForm() {
    if (this.productForm.valid) {
      const headers = new HttpHeaders().set(
        'Authorization',
        `Bearer ${this.token}`
      );

      if (this.isEditMode) {
        this.http
          .patch(
            `http://localhost:8888/api/v1/product/${this.productId}`,
            {
              ...this.productForm.value,
            },
            {
              headers,
            }
          )
          .subscribe(
            (res: any) => {
              console.log('res', res);
              this.navigateTo('/dashboard/product');
            },
            (error: HttpErrorResponse) => {
              console.log('error', error);
            }
          );
      } else {
        this.http
          .post(
            'http://localhost:8888/api/v1/product/create',
            {
              ...this.productForm.value,
            },
            {
              headers,
            }
          )
          .subscribe(
            (res: any) => {
              console.log('res', res);
              this.navigateTo('/dashboard/product');
            },
            (error: HttpErrorResponse) => {
              console.log('error', error);
            }
          );
      }

      console.log('submitted...', this.productForm.value);
    } else {
      this.productForm.markAllAsTouched();
    }
  }

  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach((field) => {
      const control = formGroup.get(field);
      if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      } else {
        control!.markAsTouched({ onlySelf: true });
      }
    });
  }

  addTag(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    if (value) {
      this.product.tags.push(value.trim());
    }

    event.chipInput!.clear();
  }

  removeTag(tag: string): void {
    const index = this.product.tags.indexOf(tag);

    if (index >= 0) {
      this.product.tags.splice(index, 1);
    }
  }

  editTag(tag: string, event: MatChipEditedEvent) {
    const value = event.value?.trim();

    if (!value) {
      this.removeTag(tag);
      return;
    }

    const index = this.product.tags.indexOf(tag);
    if (index !== -1) {
      this.product.tags[index] = value;
    }
  }

  navigateTo(val: string) {
    this.navigationService.handleNavigate(val);
  }
}
