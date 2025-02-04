/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
import { FormatLocaleDefinition } from 'd3-format';
import { isRequired } from '../../utils';
import NumberFormatter from '../NumberFormatter';
import { NumberFormatFunction } from '../types';

function indianCurrencyFormatter(num: number) {
  if (num >= 10000000) {
    return `${(num / 10000000).toFixed(2)} Cr`;
  }

  if (num >= 100000) {
    return `${(num / 100000).toFixed(2)} L`;
  }

  if (num >= 1000) {
    return `${(num / 1000).toFixed(2)} K`;
  }

  return `${num.toFixed(2)}`;
}

export default function createShortenedIndianFormatter(config: {
  description?: string;
  formatString: string;
  label?: string;
  locale?: FormatLocaleDefinition;
}) {
  const {
    description,
    formatString = isRequired('config.formatString'),
    label,
  } = config;

  let formatFunc: NumberFormatFunction;
  let isInvalid = false;

  try {
    formatFunc = indianCurrencyFormatter;
  } catch (error) {
    formatFunc = value => `${value} (Invalid format: ${formatString})`;
    isInvalid = true;
  }

  return new NumberFormatter({
    description,
    formatFunc,
    id: formatString,
    isInvalid,
    label,
  });
}
